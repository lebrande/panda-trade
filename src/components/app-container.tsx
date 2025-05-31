export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-10 flex justify-center bg-[#212b36]">
      <div className="w-md p-8 rounded-3xl bg-[#2a343f]">
        {children}
      </div>
    </div>
  )
}