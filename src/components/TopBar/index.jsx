// src/components/TopBar/index.jsx
import React from 'react'
import {
  MapPin,
  Trash2,
  Truck,
  Shield,
  Calendar,
  CreditCard,
} from 'lucide-react'

const STEPS = [
  { key: 'postcode', label: 'Postcode',     Icon: MapPin },
  { key: 'waste',    label: 'Waste Type',   Icon: Trash2 },
  { key: 'skip',     label: 'Select Skip',  Icon: Truck },
  { key: 'permit',   label: 'Permit Check', Icon: Shield },
  { key: 'date',     label: 'Choose Date',  Icon: Calendar },
  { key: 'payment',  label: 'Payment',      Icon: CreditCard },
]

export default function TopBar({ activeStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === activeStep)

  return (
    <nav className="bg-[#121212] px-4 py-3">
      <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl mx-auto">
        {STEPS.map((step, idx) => {
          const done   = idx < currentIndex
          const active = idx === currentIndex
          const text   = done || active ? 'text-blue-500' : 'text-gray-500'
          const bar    = idx < currentIndex ? 'bg-blue-500' : 'bg-gray-500'

          return (
            <React.Fragment key={step.key}>
              <div className={`${text} flex items-center space-x-1`}>
                <step.Icon size={20} />
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`${bar} h-px w-6`} aria-hidden="true" />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </nav>
  )
}
