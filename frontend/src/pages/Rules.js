import React from "react";

//Components
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";

const Rules = () => {
    return (
        <Template>
            <TitleDash title="Rules" />
            <div className="mt-12">
                <h1 className="text-xl text-white font-semibold">
                    Game Play :{" "}
                </h1>
                <p className="ml-3 text-lg text-white lg:w-4/5 w-full">
                    At each level, you will be provided with a clue which will
                    be pointing towards a location. Once you crack the clue, you
                    will find a QR code at the location which will lead you to
                    the next level if the answer is correct.
                </p>
                <h1 className="text-xl text-white font-semibold mt-6">
                    Duration:
                </h1>
                <p className="ml-3 text-lg text-white lg:w-4/5 w-full">
                    The online quest which will be live for two days.
                </p>
                <h1 className="text-xl text-white font-semibold mt-6">
                    Points :
                </h1>
                <p className="ml-3 text-lg text-white lg:w-4/5 w-full word-wrap">
                    Every level holds 10 points. After each wrong submission,
                    the total points will get deducted by 2. For eg. 10 8 6 4 2.
                    Attempts Points 1st attempt correct answer 10 points 2nd
                    attempt correct answer 8 points 3rd attempt correct answer 6
                    points 4th attempt correct answer 4 points 5th attempt
                    correct answer 2 points Wrong answer 5th time Disqualified
                    The maximum number of attempts for each level is 5. After 5
                    attempts, your account will be blocked. All the submissions
                    of a level will be recorded in our DB so avoid guesswork and
                    play fair.
                </p>
                <h1 className="text-xl text-white font-semibold mt-6">
                    Solutions :
                </h1>
                <p className="ml-3 text-lg text-white lg:w-4/5 w-full word-wrap">
                    Questions are of two types, online or offline. Offline
                    questions will be pointing towards only one location in the
                    college.
                </p>
                <h1 className="text-xl text-white font-semibold mt-6">
                    Bonus Points :
                </h1>
                <p className="ml-3 text-lg text-white lg:w-4/5 w-full word-wrap">
                    Within the college, a Special QR code with the tag "Scan at
                    your own Risk" will be set up at different places. You can
                    try your luck atmost 5 times using these QR codes. These can
                    prove to be lucky or unlucky for you. So Beware.
                </p>
                <h1 className="text-xl text-white font-semibold mt-6">
                    Appeals :
                </h1>
                <p className="ml-3 text-lg text-white lg:w-4/5 w-full word-wrap">
                    There are no appeals in this game but if you think there is
                    an error, feel free to contact us.
                </p>
                <h1 className="text-xl text-white font-semibold mt-6">
                    Disqualifications :
                </h1>
                <ol type="1" className="list-decimal list-outside ml-3">
                    <li className="text-lg text-white lg:w-4/5 w-full ml-3">
                        Usage of foul names will lead to disqualification.
                    </li>
                    <li className="text-lg text-white lg:w-4/5 w-full ml-3">
                        The society holds the right to disqualify any individual
                        in case of any unethical means.
                    </li>
                </ol>
            </div>
        </Template>
    );
};

export default Rules;
