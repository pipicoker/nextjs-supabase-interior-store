import { createClient } from "@supabase/supabase-js";
import Benefits from "./Benefits";



const BenefitsWrapper = async() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data: benefits, error } = await supabase
    .from('benefits')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  if (!benefits) return <div>No products found</div>
  
    return (
    <div>
        <Benefits benefits={benefits}/>
    </div>
  )
}

export default BenefitsWrapper