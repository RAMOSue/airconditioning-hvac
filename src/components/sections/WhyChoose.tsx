import { ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { cdn, cdnSrcSet } from '@/lib/img'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'

export function WhyChoose() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src={cdn('/img/about-team.jpg', 640, 760)}
            srcSet={cdnSrcSet(
              '/img/about-team.jpg',
              [400, 640, 900],
              640 / 760,
            )}
            sizes="(min-width: 1024px) 42vw, 100vw"
            width={640}
            height={760}
            loading="lazy"
            decoding="async"
            alt="HVAC technician discussing service details with a homeowner"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="lg:col-span-7">
          <SectionHeading
            align="left"
            eyebrow="A more human kind of HVAC service"
            title="The right solution starts with listening."
            description="A room that never feels comfortable, an ageing unit or an unexpected breakdown can make the next step hard to judge. Start by sharing what is happening in your space, then explore options that fit the property and your needs."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/get-a-quote">
                Tell us what you need <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about">
                More about ClimatePro <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
