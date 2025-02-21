import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-2 max-w-md mx-auto">
        <Input type="text" placeholder="Search query..." className="flex-1" />
        <Button className="bg-[#40BFFF] hover:bg-[#40BFFF]/90">Search</Button>
      </div>
    </div>
  )
}

