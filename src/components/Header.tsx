import React from "react";

type HeaderProps = {
    dueDate?: string;
    timeRemaining: number;
};

const LOGO_PRIMARY = "/assets/flashfire-logo1.png";
const LOGO_SECONDARY = "/assets/flashfire-logo2.png";

const Header: React.FC<HeaderProps> = ({ dueDate, timeRemaining }) => {
    const hasCountdown = Number.isFinite(timeRemaining) && timeRemaining > 0;

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <header className="bg-white px-3 py-4 border-b border-gray-200 md:px-6">
            <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:text-left">
                <div className="flex items-center gap-2">
                    <img
                        src={LOGO_PRIMARY}
                        alt="FlashFire logo"
                        className="h-12 w-auto object-contain"
                    />
                    <div className="text-left">
                        <h1 className="text-2xl font-bold uppercase tracking-wide text-red-600">
                            FlashFire
                        </h1>
                        <p className="text-sm font-semibold text-black">
                            Authorised Job Search
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-left md:items-start md:text-left md:-translate-x-12">
                    <div className="flex items-center gap-1.5 md:justify-start">
                        <img
                            src={LOGO_SECONDARY}
                            alt="Authorized payment icon"
                            className="h-10 w-10 object-contain"
                        />
                        <div className="text-left">
                            <h2 className="text-lg font-semibold text-black">
                                Authorized Payment Options
                            </h2>
                            <p className="text-sm semi-bold text-black">
                                Please use any of the following options to complete your payment.
                            </p>
                        </div>
                    </div>
                    {(dueDate || hasCountdown) && (
                        <div className=" ml-14 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:justify-start">
                            {dueDate && (
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs   tracking-wide text-gray-600">
                                        Due Date:
                                    </span>
                                    <span className="text-sm  text-gray-600">{dueDate}</span>
                                </div>
                            )}
                            {hasCountdown && (
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs   tracking-wide text-gray-600">
                                        Link expires in:
                                    </span>
                                    <span className="text-sm font-semibold text-red-600">
                                        {formatTime(timeRemaining)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
