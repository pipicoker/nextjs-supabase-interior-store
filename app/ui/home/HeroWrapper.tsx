import { createClient } from "@supabase/supabase-js"
import Hero from "./Hero"


const HeroWrapper = async() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data: hero, error } = await supabase
    .from('hero')
    .select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return <div>Error loading products</div>
  }

  if (!hero) return <div>No products found</div>
  return (
    <div>
        <Hero hero={hero}/>
    </div>
  )
}

export default HeroWrapper