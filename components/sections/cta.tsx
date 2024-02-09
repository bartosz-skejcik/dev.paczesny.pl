import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

type Props = {};

function Cta({}: Props) {
    return (
        <div className="flex items-center relative z-50 justify-center gap-6">
            <Link href={siteConfig.links.order.buy}>
                <Button
                    size="lg"
                    color="secondary"
                    variant="shadow"
                    endContent={<ShoppingBag />}
                >
                    Order now
                </Button>
            </Link>
            <Link href={siteConfig.links.order.default}>
                <Button size="lg" variant="light" endContent={<ArrowRight />}>
                    Learn more
                </Button>
            </Link>
        </div>
    );
}

export default Cta;
