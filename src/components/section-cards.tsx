import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from '../components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

export function SectionCards() {
  return (
    <div
      className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
      style={{
        // Propagate custom tokens to all card children
        "--color-primary-dark": "#2F327D",
        "--color-accent": "rgba(112, 45, 255, 0.20)",
        "--color-border": "#CCCCCC",
        "--color-text": "#202020",
      } as React.CSSProperties}
    >
      {/* Card 1 – Total Revenue */}
      <Card
        className="@container/card border shadow-xs"
        style={{
          background: "linear-gradient(to top, rgba(112,45,255,0.08), #ffffff)",
          borderColor: "#CCCCCC",
        }}
      >
        <CardHeader>
          <CardDescription style={{ color: "#2F327D", fontWeight: 600 }}>
            Total Revenue
          </CardDescription>
          <CardTitle
            className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
            style={{ color: "#202020" }}
          >
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              style={{
                background: "rgba(112,45,255,0.12)",
                borderColor: "#2F327D",
                color: "#2F327D",
                fontWeight: 600,
              }}
            >
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div
            className="line-clamp-1 flex gap-2 font-medium"
            style={{ color: "#202020" }}
          >
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div style={{ color: "#CCCCCC" }}>
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      {/* Card 2 – New Customers */}
      <Card
        className="@container/card border shadow-xs"
        style={{
          background: "linear-gradient(to top, rgba(112,45,255,0.08), #ffffff)",
          borderColor: "#CCCCCC",
        }}
      >
        <CardHeader>
          <CardDescription style={{ color: "#2F327D", fontWeight: 600 }}>
            New Customers
          </CardDescription>
          <CardTitle
            className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
            style={{ color: "#202020" }}
          >
            1,234
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              style={{
                background: "rgba(112,45,255,0.12)",
                borderColor: "#2F327D",
                color: "#2F327D",
                fontWeight: 600,
              }}
            >
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div
            className="line-clamp-1 flex gap-2 font-medium"
            style={{ color: "#202020" }}
          >
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div style={{ color: "#CCCCCC" }}>
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>

      {/* Card 3 – Active Accounts */}
      <Card
        className="@container/card border shadow-xs"
        style={{
          background: "linear-gradient(to top, rgba(112,45,255,0.08), #ffffff)",
          borderColor: "#CCCCCC",
        }}
      >
        <CardHeader>
          <CardDescription style={{ color: "#2F327D", fontWeight: 600 }}>
            Active Accounts
          </CardDescription>
          <CardTitle
            className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
            style={{ color: "#202020" }}
          >
            45,678
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              style={{
                background: "rgba(112,45,255,0.12)",
                borderColor: "#2F327D",
                color: "#2F327D",
                fontWeight: 600,
              }}
            >
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div
            className="line-clamp-1 flex gap-2 font-medium"
            style={{ color: "#202020" }}
          >
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div style={{ color: "#CCCCCC" }}>Engagement exceed targets</div>
        </CardFooter>
      </Card>

      {/* Card 4 – Growth Rate */}
      <Card
        className="@container/card border shadow-xs"
        style={{
          background: "linear-gradient(to top, rgba(112,45,255,0.08), #ffffff)",
          borderColor: "#CCCCCC",
        }}
      >
        <CardHeader>
          <CardDescription style={{ color: "#2F327D", fontWeight: 600 }}>
            Growth Rate
          </CardDescription>
          <CardTitle
            className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
            style={{ color: "#202020" }}
          >
            4.5%
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              style={{
                background: "rgba(112,45,255,0.12)",
                borderColor: "#2F327D",
                color: "#2F327D",
                fontWeight: 600,
              }}
            >
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div
            className="line-clamp-1 flex gap-2 font-medium"
            style={{ color: "#202020" }}
          >
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div style={{ color: "#CCCCCC" }}>Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}