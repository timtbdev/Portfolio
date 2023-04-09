import { FC } from "react"

interface ProfileIconAttributes {
  className?: string
}

const ProfileIcon: FC<ProfileIconAttributes> = ({
  className = "",
}: ProfileIconAttributes) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <title>circle-09</title>
      <g>
        <circle fill="none" cx="24" cy="24" r="23"></circle>{" "}
        <rect
          x="19"
          y="23.73913"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#EAC3A2"
          width="10"
          height="11.4130402"
        ></rect>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#EAD8C5"
          d="M24,29c-4.4182796,0-8-3.5817204-8-8v-3 c0-4.4182816,3.5817204-8,8-8s8,3.5817184,8,8v3C32,25.4182796,28.4182796,29,24,29z"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M24,47c6.7350464,0,12.7935181-2.8956299,16.999939-7.5092163 c-0.0003662-1.6495361-1.2192383-3.5496826-2.7229004-4.2388306L29,31c0,0-2,2-5,2s-5-2-5-2l-9.2770386,4.2519531 c-1.5061035,0.6902466-2.7225342,2.5869141-2.7229004,4.2388306C11.2064819,44.1043701,17.2649536,47,24,47z"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#444444"
          d="M28,14c2.2091408,0,4,1.7908592,4,4v-5.000061 C32,10.7996483,30.2085896,9,27.9987698,9H27.5l-1.0499496-2.0998993c-0.2539501-0.5079002-0.8632202-0.7348289-1.3729-0.5309601 l-6.2915897,2.5166397C17.2462902,9.5014801,16,11.3438911,16,13.0016708V18c0-2.2091408,1.7908592-4,4-4H28z"
        ></path>
      </g>
    </svg>
  )
}

export default ProfileIcon
