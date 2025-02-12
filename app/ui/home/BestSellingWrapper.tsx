// app/ui/home/BestSellingWrapper.tsx (Server Component)
import { createClient } from '@supabase/supabase-js'
import BestSelling from './BestSelling'

const BestSellingWrapper = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data: bestselling, error } = await supabase
    .from('bestselling')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  if (!bestselling) return <div>No products found</div>

  return <BestSelling bestselling={bestselling} />
}

export default BestSellingWrapper