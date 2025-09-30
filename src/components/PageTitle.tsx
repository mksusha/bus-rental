// src/components/PageTitle.tsx
import { Helmet } from "react-helmet-async";

type PageTitleProps = {
    title: string;
    description: string;
};

export default function PageTitle({ title, description }: PageTitleProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
}
