export const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212b36]">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#2a343f]">
        {children}
      </div>
    </div>
  )
}