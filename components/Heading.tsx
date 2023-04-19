import { Avatar } from "@/components"
import { Text, Title } from "@/components/blog"
import ProfileImage from "@/public/profile.jpg"

const Heading = () => {
  return (
    <>
      <>
        <div className="pb-4 pt-10 sm:pb-8 sm:pt-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Avatar
                image={ProfileImage}
                description="Profile image"
                large={true}
                className="mx-auto mb-2 text-center sm:mb-4"
              />
            </div>
            <Title className="mb-2 text-center">Hello</Title>
            <Text className="text-center">
              I&apos;m Tim, and welcome to my portfolio.
            </Text>
          </div>
        </div>
      </>
    </>
  )
}

export default Heading
