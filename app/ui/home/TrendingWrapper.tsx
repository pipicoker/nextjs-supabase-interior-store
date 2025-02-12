// app/ui/home/TrendingWrapper.tsx (Server Component)
import { createClient } from '@supabase/supabase-js'
import Trending from './Trending'

const TrendingWrapper = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data: trending, error } = await supabase
    .from('trending')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  if (!trending) return <div>No products found</div>

  return <Trending trending={trending}/>
}

export default TrendingWrapper