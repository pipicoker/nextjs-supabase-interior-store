import React from 'react'
import { useProductStore } from '../../store/productStore'

const DropdownFilter = () => {
    const {setPriceFilter} = useProductStore();
    // const [active, setActive] = useState(false)

    // const toggleDropdown = () => {
    //     setActive(!active)
    // }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPriceFilter(value); // Set price filter based on dropdown selection
      };


    return (
        
    
      
        <div className="inline-flex bg-white border rounded-md">
           
    
            <select className="p-2" onChange={handleChange}>
                <option value="asc"
                    className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                    Price: Low to High
                </option>
                <option value="desc"
                    className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                >
                    Price: High to Low
                </option>
                
            </select>
             
        </div>
  )
}

export default DropdownFilter
