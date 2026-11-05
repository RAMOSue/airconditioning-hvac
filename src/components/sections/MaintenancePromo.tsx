import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { maintenancePromo } from '@/config/content'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { SampleBadge } from '@/components/shared/SampleNotice'
import { cdn } from '@/lib/img'

export function MaintenancePromo() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid overflow-hidden rounded-2xl bg-navy md:grid-cols-2">
          <div className="relative min-h-64 md:min-h-0">
            <img
              src={cdn('/img/interior-comfort.jpg', 900, 650)}
              width={900}
              height={650}
              loading="lazy"
              decoding="async"
              alt="Comfortable living space with a wall-mounted thermostat"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div className="bg-gradient-to-br from-navy-2 to-[#243d72] px-6 py-8 text-white sm:px-9 sm:py-10">
            <SectionHeading
              align="left"
              eyebrow="Maintenance Plans"
              title="A little planned care can make a difference."
              description="If you rely on heating or cooling through the year, regular maintenance gives you a chance to check how the system is going and plan ahead."
              tone="light"
            />
            <ul className="mt-6 space-y-2.5">
              {[
                'Scheduled seasonal servicing for heating and cooling',
                'Reminders so servicing is not forgotten',
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-sm font-medium text-white/90"
                >
                  <CheckCircle2
                    className="size-5 shrink-0 text-emerald-300"
                    aria-hidden="true"
                  />{' '}
                  {b}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" variant="light" className="mt-6">
              <Link to="/maintenance-plans">
                Explore Maintenance Plans <ArrowRight />
              </Link>
            </Button>
            <div className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
                <CalendarCheck className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-white">
                  {maintenancePromo.planName}
                </h3>
                <p className="text-xs text-white/75">
                  Sample plan concept — see current options and terms.
                </p>
              </div>
              <SampleBadge>Illustrative</SampleBadge>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
