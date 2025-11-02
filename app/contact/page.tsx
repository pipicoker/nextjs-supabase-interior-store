import ContactUs from "../ui/contact/ContactUs"
import Map from "../ui/contact/Map"

export default function Contactpage() {
  
    return (
      <div className='min-h-screen pt-14 px-6 md:px-[60px] bg-[#F5F5F5] pb-20'>
       <ContactUs />
       <Map />
      </div>
    )
  }