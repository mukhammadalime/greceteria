import "swiper/css";
import { Autoplay } from "swiper";
import TeamMember from "./TeamMember";
import { Swiper, SwiperSlide } from "swiper/react";

const teamMembers = [
  {
    id: 1,
    name: "Robert Fox",
    position: "Worker",
    image: "/assets/images/users/user-19.jpg",
  },
  {
    id: 6,
    name: "Mukhammadali",
    position: "CEO & Founder",
    image: "/assets/images/users/default.jpg",
  },
  {
    id: 2,
    name: "Jone Cooper",
    position: "Security Guard",
    image: "/assets/images/users/user-18.jpg",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    position: "Manager",
    image: "/assets/images/users/user-9.jpg",
  },
  {
    id: 4,
    name: "Cody Fisher",
    position: "Manager Assistant",
    image: "/assets/images/users/user-17.jpg",
  },
  {
    id: 5,
    name: "Laura Wilson",
    position: "Worker",
    image: "/assets/images/users/user-7.jpg",
  },
];

const Team = () => {
  return (
    <div className="section-lg">
      <div className="container">
        <div className="team">
          <div className="team__header">
            <h2>Our Awesome Team</h2>
            <p>
              Pellentesque a ante vulputate leo porttitor luctus sed eget eros.
              Nulla et rhoncus neque. Duis non diam eget est luctus tincidunt a
              a mi.
            </p>
          </div>
          <div className="team__main">
            <Swiper
              grabCursor={true}
              modules={[Autoplay]}
              slidesPerView="auto"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              draggable={true}
            >
              {teamMembers.map((member) => (
                <SwiperSlide key={member.id} className="team-member-carousel">
                  <TeamMember key={member.id} {...member} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
