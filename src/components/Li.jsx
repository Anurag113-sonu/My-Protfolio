import { Link } from "react-router-dom"

const Li = () => {
  return (
    <section className='cta'>
        <p className='cta-text'>
        Want to visit my Profile ? <br className='sm:block hidden' />
        
      </p>
    <Link to='https://www.linkedin.com/in/kanta-anurag-sahoo-09a7912a4/recent-activity/all/' className='btn'>
      MY Profile
    </Link>
  </section>
  )
}

export default Li