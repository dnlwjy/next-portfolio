import ShopCard from "@/components/ShopCard"
import Tag from '@/components/Tag'
import MotionDiv from "@/components/MotionDiv";
import { withAutoIds } from "@/lib/slugify";
import SearchInput from "@/components/SearchInput";

interface ShopItemProps {
    id: string
    image: string
    link: string
    title: string
    price: number | string
}

const shopItemsData = [
    { image: "/1.png", link: "/shop/xxx", title: "Esteem — Sport Car Dealership Template Esteem — Sport Car Dealership Template", price: "0" as const },
    { image: "/1.png", link: "/shop/xxx", title: "Esteem — Sport Car Dealership Template", price: 24 },
    { image: "/1.png", link: "/shop/xxx", title: "Esteem — Sport Car Dealership Template", price: 24 },
    { image: "/1.png", link: "/shop/xxx", title: "Esteem — Sport Car Dealership Template", price: 24 },
    { image: "/1.png", link: "/shop/xxx", title: "Esteem — Sport Car Dealership Template", price: 24 },
    { image: "/1.png", link: "/shop/xxx", title: "Esteem — Sport Car Dealership Template", price: 24 },
]

const shopItems: ShopItemProps[] = withAutoIds(shopItemsData)

export default function Shop() {
    console.log("─── page: SHOP ──────────────────────────────────────────────────────");
    return (
        <main>
            <section className="flex-col pt-40 gap-16">

                <MotionDiv variant="up" styles="flex flex-col gap-6 items-center w-full">
                    <h1 className="text-center">
                        <span className="text-(--gray)">Welcome to</span>
                        <br />
                        My Shop
                    </h1>

                </MotionDiv>

                <MotionDiv variant="up" del={0.5}>
                    <ul className="flex flex-wrap justify-center gap-2 w-full">
                        <Tag title="All" clickable />
                        <Tag title="Website Templates" clickable />
                        <Tag title="Sheet Music" clickable />
                        <Tag title="Others" clickable />
                    </ul>
                </MotionDiv>

                <MotionDiv variant="up" del={0.7} styles="flex flex-col flex-1 gap-2">
                    <SearchInput />
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {shopItems.map((item) => (
                            <ShopCard key={item.id} {...item} />
                        ))}
                    </div>
                </MotionDiv>

            </section>
        </main>
    )
}