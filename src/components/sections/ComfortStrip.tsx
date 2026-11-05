import { MessageSquareText, Snowflake, Wrench } from 'lucide-react'
import { Container } from '@/components/shared/SectionHeading'

export function ComfortStrip() {
  return (
    <section className="bg-[#111318] py-5 text-white">
      <Container>
        <ul className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <li className="flex items-center justify-center gap-3 text-center text-sm font-semibold md:justify-end md:text-right">
            <Wrench
              className="size-5 shrink-0 text-blue-300"
              aria-hidden="true"
            />
            <span>Repair and maintenance</span>
          </li>
          <li className="flex flex-col items-center justify-center gap-1 text-center text-xs font-extrabold uppercase tracking-wide">
            <span className="grid size-14 place-items-center rounded-full border-2 border-amber-300 bg-navy text-amber-200 shadow-lg">
              <MessageSquareText className="size-6" aria-hidden="true" />
            </span>
            <span>Clear options before work</span>
          </li>
          <li className="flex items-center justify-center gap-3 text-center text-sm font-semibold md:justify-start md:text-left">
            <Snowflake
              className="size-5 shrink-0 text-blue-300"
              aria-hidden="true"
            />
            <span>Heating and cooling solutions</span>
          </li>
        </ul>
      </Container>
    </section>
  )
}
