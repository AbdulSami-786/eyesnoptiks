import { useState } from 'react'
import './PrescriptionForm.css'

export const LENS_FIELDS = ['sph', 'cyl', 'axis', 'dia', 'bc', 'colour']
export const SPECTACLE_ROWS = ['dist', 'mid', 'add']
export const SPECTACLE_FIELDS = ['sph', 'cyl', 'axis']

export const SPECTACLE_LENS_TYPES = [
  'Blue Light Glasses',
  'Computer Glasses',
  'Antiglare Glasses',
  'Transition / Photochromic Glasses',
  'Bifocal Glasses',
  'Progressive Glasses',
  'Matte Sunglasses',
]

export const CONTACT_LENS_TYPES = [
  'Colored Lenses',
  'Transparent Lenses',
  'Daily Disposable Lenses',
  'Bausch And Lomb Lenses',
  'Bella Lenses',
  'Biomedics Lenses',
  'Silicone Hydrogel Lenses',
]

const LENS_FIELD_LABELS = { sph: 'Sph.', cyl: 'Cyl.', axis: 'Axis.', dia: 'Dia', bc: 'B.C.', colour: 'Colour' }
const SPECTACLE_ROW_LABELS = { dist: 'Dist.', mid: 'Mid', add: 'Add' }

function emptyLensEye() {
  return { sph: '', cyl: '', axis: '', dia: '', bc: '', colour: '' }
}

function emptySpectacleEye() {
  return { dist: { sph: '', cyl: '', axis: '' }, mid: { sph: '', cyl: '', axis: '' }, add: { sph: '', cyl: '', axis: '' } }
}

export function emptyPrescription(type) {
  if (type === 'spectacle') {
    return { type: 'spectacle', name: '', lensType: '', right: emptySpectacleEye(), left: emptySpectacleEye() }
  }
  return { type: 'lens', name: '', lensType: '', right: emptyLensEye(), left: emptyLensEye() }
}

function hasEyeData(prescription) {
  const eyes = [prescription.right, prescription.left]
  if (prescription.type === 'spectacle') {
    return eyes.some((eye) =>
      SPECTACLE_ROWS.some((row) => SPECTACLE_FIELDS.some((f) => String(eye[row][f] || '').trim() !== '')),
    )
  }
  return eyes.some((eye) => LENS_FIELDS.some((f) => String(eye[f] || '').trim() !== ''))
}

export function isPrescriptionFilled(prescription) {
  if (!prescription) return false
  if (prescription.lensType) return true
  return hasEyeData(prescription)
}

export function formatPrescriptionLines(prescription) {
  if (!prescription || !isPrescriptionFilled(prescription)) {
    return ['Prescription: No Prescription']
  }

  const lines = ['Prescription:']
  if (prescription.name) lines.push(`  For: ${prescription.name}`)
  if (prescription.lensType) {
    lines.push(`  Lens type: ${prescription.lensType} (price to be confirmed)`)
  }

  if (hasEyeData(prescription)) {
    const sides = ['right', 'left']

    if (prescription.type === 'spectacle') {
      sides.forEach((side) => {
        const eye = prescription[side]
        const rowParts = SPECTACLE_ROWS.map((row) => {
          const vals = SPECTACLE_FIELDS.map((f) => `${f.toUpperCase()} ${eye[row][f] || '-'}`).join(', ')
          return `${SPECTACLE_ROW_LABELS[row]} (${vals})`
        })
        lines.push(`  ${side === 'right' ? 'R' : 'L'}: ${rowParts.join(' | ')}`)
      })
    } else {
      sides.forEach((side) => {
        const eye = prescription[side]
        const vals = LENS_FIELDS.map((f) => `${LENS_FIELD_LABELS[f]} ${eye[f] || '-'}`).join(', ')
        lines.push(`  ${side === 'right' ? 'R' : 'L'}: ${vals}`)
      })
    }
  }

  return lines
}

export default function PrescriptionForm({ type, value, onChange }) {
  const [skip, setSkip] = useState(!isPrescriptionFilled(value))

  function handleSkip(next) {
    setSkip(next)
    if (next) {
      onChange(emptyPrescription(type))
    }
  }

  function updateName(name) {
    onChange({ ...value, name })
  }

  function updateLensType(lensType) {
    onChange({ ...value, lensType })
  }

  function updateLensField(side, field, val) {
    onChange({ ...value, [side]: { ...value[side], [field]: val } })
  }

  function updateSpectacleField(side, row, field, val) {
    onChange({
      ...value,
      [side]: { ...value[side], [row]: { ...value[side][row], [field]: val } },
    })
  }

  return (
    <div className="prescription-form">
      <div className="prescription-form__toggle">
        <button
          type="button"
          className={`prescription-form__toggle-btn ${skip ? 'is-active' : ''}`}
          onClick={() => handleSkip(true)}
        >
          No Prescription
        </button>
        <button
          type="button"
          className={`prescription-form__toggle-btn ${!skip ? 'is-active' : ''}`}
          onClick={() => handleSkip(false)}
        >
          Enter Prescription
        </button>
      </div>

      {!skip && (
        <div className="prescription-form__card">
          <p className="prescription-form__title">
            Your {type === 'spectacle' ? 'Spectacles' : 'Contact Lenses'} Prescription
          </p>

          <label className="prescription-form__name-label" htmlFor={`rx-name-${type}`}>
            Name
          </label>
          <input
            id={`rx-name-${type}`}
            type="text"
            placeholder="Patient name"
            value={value.name}
            onChange={(e) => updateName(e.target.value)}
            className="prescription-form__name-input"
          />

          <label className="prescription-form__name-label" htmlFor={`rx-lens-type-${type}`}>
            Lens Type (optional)
          </label>
          <select
            id={`rx-lens-type-${type}`}
            value={value.lensType}
            onChange={(e) => updateLensType(e.target.value)}
            className="prescription-form__lens-type-select"
          >
            <option value="">Select a lens type...</option>
            {(type === 'spectacle' ? SPECTACLE_LENS_TYPES : CONTACT_LENS_TYPES).map((lt) => (
              <option key={lt} value={lt}>
                {lt}
              </option>
            ))}
          </select>
          {value.lensType && (
            <p className="prescription-form__lens-type-note">
              Price for this lens type will be confirmed on WhatsApp.
            </p>
          )}

          {type === 'spectacle' ? (
            <div className="prescription-form__spectacle-grid">
              {['right', 'left'].map((side) => (
                <div className="prescription-form__eye" key={side}>
                  <span className="prescription-form__eye-label">{side === 'right' ? 'R' : 'L'}</span>
                  {SPECTACLE_ROWS.map((row) => (
                    <div className="prescription-form__row" key={row}>
                      <span className="prescription-form__row-label">{SPECTACLE_ROW_LABELS[row]}</span>
                      {SPECTACLE_FIELDS.map((f) => (
                        <input
                          key={f}
                          type="text"
                          inputMode="decimal"
                          placeholder={f.toUpperCase()}
                          value={value[side][row][f]}
                          onChange={(e) => updateSpectacleField(side, row, f, e.target.value)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="prescription-form__lens-grid">
              {['right', 'left'].map((side) => (
                <div className="prescription-form__eye" key={side}>
                  <span className="prescription-form__eye-label">{side === 'right' ? 'R' : 'L'}</span>
                  <div className="prescription-form__row">
                    {LENS_FIELDS.map((f) => (
                      <label key={f} className="prescription-form__field">
                        <span>{LENS_FIELD_LABELS[f]}</span>
                        <input
                          type="text"
                          inputMode={f === 'colour' ? 'text' : 'decimal'}
                          value={value[side][f]}
                          onChange={(e) => updateLensField(side, f, e.target.value)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
