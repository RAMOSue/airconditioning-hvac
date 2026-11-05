import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { maintenancePromo } from '@/config/content'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { SampleBadge } from '@/components/shared/SampleNotice'
import { cdn } from '@/lib/img'

export function MaintenancePromo() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Maintenance Plans"
            title="Keep Your HVAC System Performing at Its Best."
            description="Regular HVAC maintenance can help identify potential issues and keep your heating and cooling system operating efficiently."
          />
          <ul className="mt-8 space-y-3">
            {['Scheduled seasonal servicing for heating and cooling', 'Reminders so servicing is not forgotten', 'Options for homes and commercial properties'].map((b) => (
              <li key={b} className="flex items-center gap-3 font-medium text-navy">
                <CheckCircle2 className="size-5 text-success" aria-hidden="true" /> {b}
              </li>
            ))}
          </ul>
          <Button asChild size="xl" className="mt-8">
            <Link to="/maintenance-plans">
              Explore Maintenance Plans <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="relative">
          <img
            src={cdn('/img/interior-comfort.jpg', 800, 600)}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            alt="Comfortable modern living room with a wall-mounted smart thermostat"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
          <div className="relative -mt-24 ml-auto w-[92%] rounded-2xl border bg-white p-6 shadow-2xl shadow-navy/15 sm:-mt-32 sm:w-80 sm:mr-6">
            <div className="flex items-center justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-white">
                <CalendarCheck className="size-5" aria-hidden="true" />
              </span>
              <SampleBadge>Illustrative plan</SampleBadge>
            </div>
            <h3 className="mt-4 text-xl font-bold">{maintenancePromo.planName}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {maintenancePromo.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
            <Link to="/maintenance-plans" hash="plans" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
              Compare plans <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
