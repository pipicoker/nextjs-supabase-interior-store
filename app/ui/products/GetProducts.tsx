import { createClient } from "@supabase/supabase-js";
import AllProducts from "./AllProducts";



const getServerSideProps = async() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data: products, error } = await supabase
    .from('allProducts')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  if (!products) return <div>No products found</div>

  // console.log(process.memoryUsage());

  
    return (
    <div>
        <AllProducts products={products}/>
    </div>
  )
}

export default getServerSideProps