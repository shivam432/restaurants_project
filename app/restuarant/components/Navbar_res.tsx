import Link from "next/link";

export default function NavbarRes({slug}:{slug:string}){
    return (
        <nav className="flex text-black border-b pb-2">
          <Link href={`/restuarant/${slug}`} className="mr-7"> Overview </Link>
          <Link href={`/restuarant/${slug}/menu`} className="mr-7"> Menu </Link>
        </nav>
    )
}