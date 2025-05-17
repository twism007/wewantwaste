import { useState, useEffect } from 'react'
import {
 ArrowRight
} from 'lucide-react'

const IMAGE_BASE =
  'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes'

export default function Product({ postcode = 'NR32', area = 'Lowestoft' }) {
  const [skips, setSkips] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSkips() {
      try {
        const res = await fetch(
          `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setSkips(data)
        if (data.length > 0) setSelected(data[0])
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSkips()
  }, [postcode, area])

  if (loading) {
    return (
      <div className="text-white text-center py-12">
        Loading skips...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-12">
        Error loading skips: {error}
      </div>
    )
  }

  if (!selected) {
    return (
      <div className="text-white text-center py-12">
        No skips available for {postcode} - {area}
      </div>
    )
  }

   const priceExVat = selected.price_before_vat
  const vatRate = selected.vat || 0
  const vatAmount = (priceExVat * vatRate) / 100
  const priceIncVat = priceExVat + vatAmount

  const imageUrl = `${IMAGE_BASE}/${selected.size}-yarder-skip.jpg`

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start gap-12">
      {/* Left: image */}
      <div className="relative w-full md:w-1/2">
        <img
          src={imageUrl}
          alt={`${selected.size} Yard Skip`}
          className="w-full rounded-xl shadow-lg object-cover"
        />
        {!selected.allowed_on_road && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Not Allowed On The Road
          </div>
        )}
      </div>

      {/* Right: details */}
      <div className="w-full md:w-1/2 text-white">

        <div className="mb-2">
          <p className="text-xl font-semibold">
           £{priceIncVat.toFixed(2)} <span className="text-sm text-gray-500 font-normal">incl. VAT</span>
          </p>
        </div>


        <h2 className="text-4xl font-bold mb-2">
          {selected.size} Yard Skip
        </h2>
        <p className="text-gray-300 mb-6">
          Hire period: {selected.hire_period_days} days
        </p>


        <div className="mb-8">
          <p className="font-medium mb-2">Select Skip Size:</p>
          <div className="flex flex-wrap gap-2">
            {skips.map((opt) => {
              const isActive = opt.size === selected.size
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt)}
                  className={`px-4 py-2 border rounded-md transition-all whitespace-nowrap
                    ${isActive
                      ? 'bg-white text-black border-blue-500'
                      : 'bg-transparent text-white border-gray-600'}
                  `}
                >
                  {opt.size} Yard
                </button>
              )
            })}
          </div>
        </div>

        <button className="px-6 py-3 bg-blue-600 rounded-md font-semibold transition">
          Continue <ArrowRight size={16} className="inline-block ml-2" />
        </button>
      </div>
    </div>
  )
}