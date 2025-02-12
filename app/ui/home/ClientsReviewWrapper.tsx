import { createClient } from "@supabase/supabase-js";
import ClientsReview from "./ClientsReview";



const ClientsReviewWrapper = async() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  if (!review) return <div>No products found</div>
  
    return (
    <div>
        <ClientsReview review={review}/>
    </div>
  )
}

export default ClientsReviewWrapper