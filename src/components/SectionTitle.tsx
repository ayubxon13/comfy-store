function SectionTitle({text}: {text: string}) {
  return (
    <>
      <p className="my-4 tracking-wide opacity-90 capitalize text-2xl md:text-3xl md:my-8">
        {text}
      </p>
      <hr />
    </>
  )
}
export default SectionTitle
