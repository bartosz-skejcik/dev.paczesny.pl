import Script from "next/script";

export default function Head() {
    return (
        <>
            <title>Bartek Paczesny - Portfolio</title>
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <meta name="description" content="Bartek Paczesny - Portfolio" />
            <meta name="theme-color" content="#001120" />
            <link rel="icon" href="/favicon.ico" />
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="1" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}
