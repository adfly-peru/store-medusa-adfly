import { Card } from "@mantine/core";
import { FeaturesCard } from "./resume";

export function OrderSummary() {
    return (
        <Card withBorder>
            Order Summary
            Thank you for your order!
            <FeaturesCard></FeaturesCard>
        </Card>
    )
}