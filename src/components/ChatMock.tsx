// Illustrative Telegram conversation used as the SmartKiranaBot cover.
const messages: { from: 'user' | 'bot'; text: string }[] = [
  { from: 'user', text: 'Sharma ji: 2 kg sugar, 1 Tata salt. Khata mein daal do' },
  { from: 'bot', text: 'Draft bill #218\n• Sugar 2 kg\n• Tata Salt 1 kg\nGST calculated. Add to Sharma ji’s khata?' },
  { from: 'user', text: 'Haan, aur PDF bhej do' },
  { from: 'bot', text: '✓ Added to khata · stock updated\n📄 invoice_218.pdf' },
]

export default function ChatMock() {
  return (
    <div className='flex w-full flex-col justify-center gap-2.5 bg-[#17212b] px-5 py-8 sm:p-8' aria-hidden='true'>
      {messages.map((m, i) => (
        <div
          key={i}
          className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-[0.72rem] leading-5 sm:text-[0.78rem] ${
            m.from === 'user'
              ? 'self-end rounded-br-sm bg-[#2b5278] text-white'
              : 'self-start rounded-bl-sm bg-[#182533] text-[#e6edf3] ring-1 ring-white/5'
          }`}
        >
          {m.text}
        </div>
      ))}
    </div>
  )
}
