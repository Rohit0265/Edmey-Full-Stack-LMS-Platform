import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";


export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const payload = JSON.stringify(req.body); // Use req.rawBody if available

        await whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: (data.first_name || "") + " " + (data.last_name || ""),
                    imageUrl: data.image_url || "",
                };
                await User.create(userData);
                return res.json({});
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: (data.first_name || "") + " " + (data.last_name || ""),
                    imageUrl: data.image_url || "",
                };
                await User.findByIdAndUpdate(data.id, userData);
                return res.json({});
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.json({});
            }

            default:
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};








const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    const markPurchaseCompletedFromSession = async (sessionObject) => {
        try {
            const purchaseId = sessionObject?.metadata?.purchaseId;
            if (!purchaseId) {
                console.error("Missing purchaseId in session metadata");
                return;
            }

            const purchaseData = await Purchase.findById(purchaseId);
            if (!purchaseData) {
                console.error("No purchase found for ID:", purchaseId);
                return;
            }

            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId.toString());

            if (!userData || !courseData) {
                console.error("User or Course not found");
                return;
            }

            // Idempotent updates to avoid duplicate entries on webhook retries.
            const isUserAlreadyInCourse = courseData.enrolledStudents.some(
                (id) => id.toString() === userData._id.toString()
            );
            if (!isUserAlreadyInCourse) {
                courseData.enrolledStudents.push(userData._id);
                await courseData.save();
            }

            const isCourseAlreadyInUser = userData.enrolledCourses.some(
                (id) => id.toString() === courseData._id.toString()
            );
            if (!isCourseAlreadyInUser) {
                userData.enrolledCourses.push(courseData._id);
                await userData.save();
            }

            // Update purchase status
            purchaseData.status = 'completed';
            await purchaseData.save();
        } catch (error) {
            console.error("Error handling payment success:", error);
        }
    };

    const markPurchaseFailedFromSession = async (sessionObject) => {
        try {
            const purchaseId = sessionObject?.metadata?.purchaseId;
            if (!purchaseId) {
                console.error("Missing purchaseId in session metadata");
                return;
            }

            const purchaseData = await Purchase.findById(purchaseId);
            if (!purchaseData) {
                console.error("No purchase found for ID:", purchaseId);
                return;
            }

            purchaseData.status = 'failed';
            await purchaseData.save();
        } catch (error) {
            console.error("Error handling payment failure:", error);
        }
    };

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            // paid OR no_payment_required (free checkout) are both successful enrollments
            if (session.payment_status === 'paid' || session.payment_status === 'no_payment_required') {
                await markPurchaseCompletedFromSession(session);
            }
            break;
        }

        case 'checkout.session.async_payment_succeeded':
            await markPurchaseCompletedFromSession(event.data.object);
            break;

        case 'checkout.session.async_payment_failed':
        case 'checkout.session.expired':
            await markPurchaseFailedFromSession(event.data.object);
            break;

        // Backward compatibility if payment_intent events are configured.
        case 'payment_intent.succeeded':
            if (event.data.object?.id) {
                const sessions = await stripeInstance.checkout.sessions.list({
                    payment_intent: event.data.object.id,
                    limit: 1
                });
                if (sessions.data.length) {
                    await markPurchaseCompletedFromSession(sessions.data[0]);
                }
            }
            break;

        case 'payment_intent.payment_failed':
            if (event.data.object?.id) {
                const sessions = await stripeInstance.checkout.sessions.list({
                    payment_intent: event.data.object.id,
                    limit: 1
                });
                if (sessions.data.length) {
                    await markPurchaseFailedFromSession(sessions.data[0]);
                }
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
};



