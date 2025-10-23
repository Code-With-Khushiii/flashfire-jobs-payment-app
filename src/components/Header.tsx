import type React from "react"

const Header: React.FC = () => {
  return (
    <header className="bg-white p-6 flex flex-col items-center text-center">
      {/* Logo Only */}
      {/* <div className="flex items-center justify-center mb-4">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEXDAADDAADJJyfHEBDQRkbmnp7jkJDdfn7qsLD11tb////55OT88PDZaGjwx8fVV1fDAAAxRdW2AAAAEXRSTlPy////////////////////8xOnmdYAAACeSURBVHgBfdFFggMgDEDRxpAI6f0vO1pH/vbhXM7BvhUibZGlbJBr61phgSjdXNV4gcX1NwuYsfyKjwTMaU+2HwnCLC4Thvb4O45qTMvWHuVX1AU/kTLaL1mrOB8I5YdGMBDNmK7jR7IJTkii/1nChGh6v+eM/Et9VIIFpqoJb/4z1CvAFgduMVVgi+y8R+xwwHpAoBPCCq8nvFz3fQOG8wlzucv/6AAAAABJRU5ErkJggg=="
          alt="Logo"
          className="h-16 w-16 object-contain"   // bigger logo
        />
      </div> */}

      {/* Payment Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          Authorized Payment Options
        </h3>
        <p className="text-sm text-gray-500">
          Please use any of the following options to complete your payment.
        </p>
      </div>
    </header>
  )
}

export default Header
