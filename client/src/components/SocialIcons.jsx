import { Link } from 'react-router-dom'
import { Linkedin,Github,GitBranch } from 'lucide-react';
const SocialIcons = () => {
  return (
    <div className='flex items-center gap-3 mt-5 ml-1 mb-2 max-md:mt-4'>

      <Link 
        target='_blank' 
        to='https://www.linkedin.com/in/rohit-mathur-9a80b2296/'
        className="group transition transform hover:scale-110 text-[#1e17ea] hover:text-blue-600"
      >
        <Linkedin size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://github.com/Rohit0265'
        className="group transition transform hover:scale-110 text-[#c2baba] hover:text-gray-500"
      >
        <Github size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
      <Link 
        target='_blank' 
        to='https://github.com/Gyanthakur/Edemy-LMS'
        className="group transition transform hover:scale-110 text-[#e01d1d] hover:text-red-600"
      >
        <GitBranch size={34} weight="fill" className="transition-colors duration-300" />
      </Link>
    </div>
  )
}

export default SocialIcons
