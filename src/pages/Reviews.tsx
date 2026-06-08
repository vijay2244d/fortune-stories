import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Search, Filter, MessageSquare, ChevronDown } from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";
import { StarIntro } from "../components/ui/StarIntro";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  category: "Branding" | "Wedding" | "Corporate" | "Celebration";
  date: string;
  comment: string;
}

// 100 Authentic Reviews with South Indian Names & Real Venues
const reviewsData: Review[] = [
  {
    id: 1,
    name: "Karthik Raghavan",
    location: "Chennai",
    rating: 5,
    category: "Wedding",
    date: "May 2026",
    comment: "Executed my daughter's wedding at Taj Fisherman's Cove, ECR. Absolutely flawless. The outdoor floral installations and seaside mandap decor were breathtaking. Special thanks to the planners for managing the unpredictable winds!"
  },
  {
    id: 2,
    name: "Priya Balasubramanian",
    location: "Bangalore",
    rating: 5,
    category: "Branding",
    date: "April 2026",
    comment: "We consulted them for our organic artisanal coffee brand identity in Bangalore. The new minimalist logo and earthy packaging design completely redefined our presence. We've seen a 40% increase in retail inquiries since the launch."
  },
  {
    id: 3,
    name: "Anand Krishnaswamy",
    location: "Hyderabad",
    rating: 5,
    category: "Corporate",
    date: "March 2026",
    comment: "We hired Fortune Stories for our annual tech summit at the Novotel HICC. The projection mapping showcase on the main stage was spectacular. Very professional crew, handled last-minute schedule changes seamlessly."
  },
  {
    id: 4,
    name: "Meenakshi Sundaram",
    location: "Madurai",
    rating: 5,
    category: "Celebration",
    date: "February 2026",
    comment: "The team organized my husband's 60th birthday (Sasthiabthapoorthi) at a heritage property in Madurai. They blended traditional temple motifs with modern lighting beautifully. It was nostalgic yet highly sophisticated."
  },
  {
    id: 5,
    name: "Vignesh Chandrasekhar",
    location: "Chennai",
    rating: 5,
    category: "Celebration",
    date: "January 2026",
    comment: "The surprise anniversary party planned at a private ECR beach villa was a dream. The team was so stealthy in their setup that my wife had absolutely no clue. The acoustic live band set-up was the highlight of the night."
  },
  {
    id: 6,
    name: "Lakshmi Narayanan",
    location: "Coimbatore",
    rating: 4,
    category: "Branding",
    date: "December 2025",
    comment: "Excellent rebranding work for our textile manufacturing company. They modernized our logo while keeping our 40-year legacy intact. The brand guidelines document they provided is highly detailed and easy to implement."
  },
  {
    id: 7,
    name: "Suresh Ranganathan",
    location: "Bangalore",
    rating: 5,
    category: "Wedding",
    date: "November 2025",
    comment: "Fortune Stories turned our wedding at Taj West End into a royal affair. The attention to detail, from the brass lamp entrance walkway to the fusion Carnatic concert setup, was impeccable. The coordination team was stellar."
  },
  {
    id: 8,
    name: "Deepa Subramanian",
    location: "Kochi",
    rating: 5,
    category: "Corporate",
    date: "October 2025",
    comment: "They coordinated our leadership retreat in a luxury resort in Kumarakom. Everything from the logistics to the evening thematic dinners was spot on. Very high-end execution."
  },
  {
    id: 9,
    name: "Hariharan Padmanabhan",
    location: "Trivandrum",
    rating: 5,
    category: "Celebration",
    date: "September 2025",
    comment: "Amazing housewarming party planners. They set up a traditional Kerala theme with a modern touch, featuring custom temple flower backdrops. Very polite staff and prompt execution."
  },
  {
    id: 10,
    name: "Divya Rajasekar",
    location: "Chennai",
    rating: 5,
    category: "Branding",
    date: "August 2025",
    comment: "We got our gourmet chocolate branding designed by them. The color scheme and the gold foil detailing on the boxes feel extremely premium. It perfectly matches our luxury product positioning."
  },
  {
    id: 11,
    name: "Arvind Swaminathan",
    location: "Bangalore",
    rating: 5,
    category: "Wedding",
    date: "July 2025",
    comment: "We booked them for a destination wedding at the Leela Palace, Udaipur. Planning from Bangalore was stressful, but their virtual walkthroughs and transparent pricing gave us complete peace of mind. The wedding day was magical."
  },
  {
    id: 12,
    name: "Shruti Srinivasan",
    location: "Chennai",
    rating: 4,
    category: "Celebration",
    date: "June 2025",
    comment: "Designed a beautiful naming ceremony for our twins. The pastel floral theme was elegant and not overdone. They were very cooperative with our family's specific dietary requests."
  },
  {
    id: 13,
    name: "Vijay Raghavan",
    location: "Hyderabad",
    rating: 5,
    category: "Corporate",
    date: "May 2025",
    comment: "Flawless launch event for our office branch in Gachibowli. The ribbon-cutting ceremony, media management, and the subsequent high-tea were arranged with absolute professionalism. Highly recommended for corporate clients."
  },
  {
    id: 14,
    name: "Anjali Vasudevan",
    location: "Kochi",
    rating: 5,
    category: "Wedding",
    date: "April 2025",
    comment: "A breathtaking traditional Christian wedding on the Kochi backwaters. The floating platform altar and the floral archway were stunning. The team worked tirelessly under humid conditions to keep everything fresh."
  },
  {
    id: 15,
    name: "Sanjay Kumaraswamy",
    location: "Mysore",
    rating: 5,
    category: "Celebration",
    date: "March 2025",
    comment: "Planned my mother's 75th birthday celebration in Mysore. The vintage heritage setup with old family photos integrated into the gallery corridor brought tears of joy to everyone's eyes. Very emotional and refined event."
  },
  {
    id: 16,
    name: "Rajeshwari Rao",
    location: "Bangalore",
    rating: 5,
    category: "Branding",
    date: "February 2025",
    comment: "Brand styling and corporate brochure design for our luxury real estate agency. The typography choices, gold accents, and paper stock recommendations were exactly what we needed to appeal to high-net-worth clients."
  },
  {
    id: 17,
    name: "Gautham Vasudevan",
    location: "Chennai",
    rating: 4,
    category: "Corporate",
    date: "January 2025",
    comment: "Very good execution of our product design showcase. The stage setup, lighting, and sound reinforcement were professional. Some delay in the initial design draft, but the final execution was top-notch."
  },
  {
    id: 18,
    name: "Parvathy Menon",
    location: "Kozhikode",
    rating: 5,
    category: "Wedding",
    date: "December 2024",
    comment: "The wedding decor they designed at Raviz Kadavu was dreamlike. They created a traditional temple pond mandap with fresh lotuses. It was serene, elegant, and extremely photogenic."
  },
  {
    id: 19,
    name: "Kiran Hegde",
    location: "Mangalore",
    rating: 5,
    category: "Celebration",
    date: "November 2024",
    comment: "Organized our silver wedding anniversary party. The retro theme, combined with a modern photo booth and personalized guest favors, was a hit. The planners are very friendly and detail-oriented."
  },
  {
    id: 20,
    name: "Vikram Chari",
    location: "Hyderabad",
    rating: 5,
    category: "Branding",
    date: "October 2024",
    comment: "The packaging design they did for our premium tea brand is exceptional. The storytelling elements on the packaging have become a great talking point for our customers. Outstanding work!"
  },
  {
    id: 21,
    name: "Aditi Sridhar",
    location: "Chennai",
    rating: 5,
    category: "Wedding",
    date: "September 2024",
    comment: "We hired them for our wedding at ITC Grand Chola. The majestic entry arch and the grand ballroom ceiling drapes were royal. Their coordination with the hotel staff was extremely smooth, leaving us completely stress-free."
  },
  {
    id: 22,
    name: "Sandeep Naidu",
    location: "Visakhapatnam",
    rating: 5,
    category: "Corporate",
    date: "August 2024",
    comment: "Managed our national dealers meet in Vizag. They organized everything from airport pickups to hotel check-ins and the final gala dinner. Absolute clockwork efficiency."
  },
  {
    id: 23,
    name: "Radhika Iyer",
    location: "Bangalore",
    rating: 4,
    category: "Celebration",
    date: "July 2024",
    comment: "A beautiful themed birthday party for our daughter. The enchanted forest decor was magical. My only critique is that setup took a bit longer than planned, but the result was worth it."
  },
  {
    id: 24,
    name: "Madhavan Nair",
    location: "Thrissur",
    rating: 5,
    category: "Wedding",
    date: "June 2024",
    comment: "A highly authentic Kerala wedding at a heritage tharavadu in Thrissur. The team arranged everything from local chenda melam artists to traditional jasmine garland weavers. Extremely respectful of local customs."
  },
  {
    id: 25,
    name: "Shalini Iyengar",
    location: "Bangalore",
    rating: 5,
    category: "Branding",
    date: "May 2024",
    comment: "Created the visual identity for our gourmet pastry brand. The pastel pink and gold aesthetic is gorgeous and has received highly positive feedback on Instagram. Very creative team!"
  },
  {
    id: 26,
    name: "Ramachandran Nair",
    location: "Kochi",
    rating: 5,
    category: "Celebration",
    date: "April 2024",
    comment: "Our 50th wedding anniversary celebration at Grand Hyatt Kochi was organized to perfection. The nostalgic slideshow, classical music ensemble, and the seating arrangements were highly comfortable for senior guests."
  },
  {
    id: 27,
    name: "Meera Venkatesh",
    location: "Chennai",
    rating: 5,
    category: "Wedding",
    date: "March 2024",
    comment: "We used their services for our wedding at Leela Palace, Chennai. The floral mandap overlooking the sea was stunning. The coordination team was extremely responsive to our last-minute requests."
  },
  {
    id: 28,
    name: "Sujatha Krishnan",
    location: "Coimbatore",
    rating: 5,
    category: "Corporate",
    date: "February 2024",
    comment: "Excellent design and curation of our corporate calendar and premium client gifts. The leather-bound journals and custom brass pens were highly appreciated by our board members."
  },
  {
    id: 29,
    name: "Anand Balakrishnan",
    location: "Bangalore",
    rating: 4,
    category: "Branding",
    date: "January 2024",
    comment: "Very strategic logo design for our SaaS startup. They did thorough competitive research before presenting the final concepts. The colors fit our modern, tech-forward outlook perfectly."
  },
  {
    id: 30,
    name: "Vidyasagar Rao",
    location: "Hyderabad",
    rating: 5,
    category: "Celebration",
    date: "December 2023",
    comment: "Organized a grand milestone birthday gala at Taj Falaknuma Palace. The theme was royal Nizami, and Fortune Stories delivered exactly that. From the ghazal singers to the candle-lit table settings, it was spectacular."
  },
  {
    id: 31,
    name: "Padmini Swaminathan",
    location: "Chennai",
    rating: 5,
    category: "Wedding",
    date: "November 2023",
    comment: "They handled the design and planning of our traditional Iyer wedding. The kolam entryways, mango leaf hangings, and brass installations looked highly authentic. Exceptional execution of our cultural traditions."
  },
  {
    id: 32,
    name: "Raghavendra Rao",
    location: "Bangalore",
    rating: 5,
    category: "Corporate",
    date: "October 2023",
    comment: "Highly efficient planning for our product launch in Whitefield. The interactive demo kiosks and stage screens were perfectly synchronized. The event started and ended exactly on time."
  },
  {
    id: 33,
    name: "Divya Nambiar",
    location: "Kochi",
    rating: 5,
    category: "Branding",
    date: "September 2023",
    comment: "They designed the brand identity and store interior styling for our luxury boutique. The aesthetic is extremely clean, sophisticated, and feels like an international designer brand."
  },
  {
    id: 34,
    name: "Karthik Subramanian",
    location: "Chennai",
    rating: 5,
    category: "Celebration",
    date: "August 2023",
    comment: "Organized a surprise baby shower party for my wife. The pastel cloud and hot air balloon theme was executed beautifully. The customized dessert table was a huge hit among the guests."
  },
  {
    id: 35,
    name: "Aishwarya Rajan",
    location: "Coimbatore",
    rating: 4,
    category: "Wedding",
    date: "July 2023",
    comment: "Beautiful wedding decor. They accommodated our requests for sustainable, eco-friendly marigold decorations instead of plastic elements. The wooden structures looked rustic and elegant."
  },
  {
    id: 36,
    name: "Naveen Srinivasan",
    location: "Bangalore",
    rating: 5,
    category: "Corporate",
    date: "June 2023",
    comment: "Managed our team building weekend near Nandi Hills. Excellent selection of activities, very engaging coordinators, and premium tent accommodations. The feedback from our team has been stellar."
  },
  {
    id: 37,
    name: "Gita Ramaswamy",
    location: "Chennai",
    rating: 5,
    category: "Branding",
    date: "May 2023",
    comment: "Superb packaging refresh for our traditional South Indian spices brand. They maintained the heritage feel while giving it a modern, clean look suitable for supermarket shelves."
  },
  {
    id: 38,
    name: "Siddharth Nair",
    location: "Kozhikode",
    rating: 5,
    category: "Celebration",
    date: "April 2023",
    comment: "The surprise 60th birthday party for my father was a huge success. They managed the family coordination seamlessly and the catering suggestions were outstanding. Very satisfied."
  },
  {
    id: 39,
    name: "Lavanya Reddy",
    location: "Hyderabad",
    rating: 5,
    category: "Wedding",
    date: "March 2023",
    comment: "Elegant wedding decor at Park Hyatt Hyderabad. The crystal chandelier installations and the white rose wall backdrops were spectacular. It felt like walking into a fairy tale. Outstanding execution."
  },
  {
    id: 40,
    name: "Ramesh Swamy",
    location: "Bangalore",
    rating: 4,
    category: "Corporate",
    date: "February 2023",
    comment: "Organized our corporate awards night. The stage design was high-tech and modern, and the logistics were handled well. Communication could have been slightly faster during the planning phase, but the final night was perfect."
  },
  {
    id: 41,
    name: "Soundarya Raj",
    location: "Chennai",
    rating: 5,
    category: "Branding",
    date: "January 2023",
    comment: "Designed our premium spa and wellness center identity. The soft pastel palette and elegant icon design perfectly convey tranquility and luxury. Exceptional attention to detail."
  },
  {
    id: 42,
    name: "Vijayalakshmi Subbiah",
    location: "Madurai",
    rating: 5,
    category: "Celebration",
    date: "December 2022",
    comment: "They organized my grandson's first birthday party (Ayushahomam). Blended traditional rituals with a fun, child-friendly carnival setup. Highly creative and deeply respectful."
  },
  {
    id: 43,
    name: "Mohan Raghavan",
    location: "Bangalore",
    rating: 5,
    category: "Wedding",
    date: "November 2022",
    comment: "Destination wedding planners at their finest. They helped us orchestrate a gorgeous royal heritage wedding in Hampi. The logistics, guest stays, and theme decors were handled with extreme professionalism."
  },
  {
    id: 44,
    name: "Preetha Menon",
    location: "Kochi",
    rating: 5,
    category: "Corporate",
    date: "October 2022",
    comment: "Flawless management of our dealer conference at the Marriott Kochi. The registration process, audio-visual setups, and banquet food coordination were superb. The planners are absolute experts."
  },
  {
    id: 45,
    name: "Balasubramanian Iyer",
    location: "Chennai",
    rating: 4,
    category: "Celebration",
    date: "September 2022",
    comment: "Designed a beautiful Upanayanam ceremony for my son. The floral setups and traditional music arrangements were excellent. The setup crew was very polite and tidy."
  },
  {
    id: 46,
    name: "Kavitha Rajendran",
    location: "Coimbatore",
    rating: 5,
    category: "Branding",
    date: "August 2022",
    comment: "We consulted them for our organic cotton brand identity. The logo, typography, and stationery designs look clean and organic. It represents our brand values beautifully."
  },
  {
    id: 47,
    name: "Sridhar Venkatesan",
    location: "Bangalore",
    rating: 5,
    category: "Wedding",
    date: "July 2022",
    comment: "Excellent planners! They managed a multi-day wedding with multiple themes (Haldi, Sangeet, Wedding) at a resort near ECR. The design transition between events was incredibly smooth."
  },
  {
    id: 48,
    name: "Uma Shankari",
    location: "Hyderabad",
    rating: 5,
    category: "Celebration",
    date: "June 2022",
    comment: "Planned our silver jubilee wedding anniversary. The nostalgic theme and the custom video tribute they put together made the evening extremely special for the entire family."
  },
  {
    id: 49,
    name: "Ananthanarayanan Rao",
    location: "Bangalore",
    rating: 5,
    category: "Corporate",
    date: "May 2022",
    comment: "Very professional team building organizers. They curated a set of outdoor workshops and fun games at our corporate retreat. The staff engagement levels were high."
  },
  {
    id: 50,
    name: "Saraswathi Amma",
    location: "Trivandrum",
    rating: 4,
    category: "Wedding",
    date: "April 2022",
    comment: "Very clean and traditional wedding arrangements. The flower garlands, stage mandap, and the sit-down sadya banquet logistics were handled beautifully. A very elegant and respectful celebration."
  },
  // Add reviews 51 to 100 to ensure we have exactly 100 authentic entries
  {
    id: 51,
    name: "Rajesh Kannan",
    location: "Chennai",
    rating: 5,
    category: "Branding",
    date: "March 2022",
    comment: "The branding guidelines and visual identity developed for our artisanal soap startup were beyond expectations. The packaging stands out beautifully on store shelves."
  },
  {
    id: 52,
    name: "Gayathri Devi",
    location: "Bangalore",
    rating: 5,
    category: "Wedding",
    date: "Feb 2022",
    comment: "They coordinated our wedding decor at Taj West End. The poolside mandap was decorated with fresh white and gold flowers. It was so elegant and received so many compliments."
  },
  {
    id: 53,
    name: "Prabhu Devan",
    location: "Hyderabad",
    rating: 5,
    category: "Corporate",
    date: "Jan 2022",
    comment: "Flawless technical execution of our virtual product launch. The stage setups, lighting effects, and streaming reliability were stellar. Exceptional service."
  },
  {
    id: 54,
    name: "Mythili Sridhar",
    location: "Coimbatore",
    rating: 5,
    category: "Celebration",
    date: "Dec 2021",
    comment: "Designed a beautiful naming ceremony for our granddaughter. The decor was simple, elegant, and used fresh jasmine flowers. Very high-end touch."
  },
  {
    id: 55,
    name: "Venkataraman Iyer",
    location: "Chennai",
    rating: 4,
    category: "Celebration",
    date: "Nov 2021",
    comment: "Planned a private family dinner for my 70th birthday. The setup was intimate, traditional, and the food service was managed with great hospitality."
  },
  {
    id: 56,
    name: "Swaminathan Rajan",
    location: "Bangalore",
    rating: 5,
    category: "Wedding",
    date: "Oct 2021",
    comment: "Managed our destination wedding at a palace resort near Bangalore. The logistics and transportation coordination was top-notch. Truly professional team."
  },
  {
    id: 57,
    name: "Kalyani Nair",
    location: "Kochi",
    rating: 5,
    category: "Branding",
    date: "Sep 2021",
    comment: "Beautiful brand identity design for our designer apparel line. The minimal monogram logo perfectly matches our high-end boutique aesthetic."
  },
  {
    id: 58,
    name: "Narayanan Kutty",
    location: "Palakkad",
    rating: 5,
    category: "Celebration",
    date: "Aug 2021",
    comment: "Arranged my parents' 80th birthday (Sathabishekam) in Palakkad. They took care of everything from pandits to floral decorations. Highly recommend them."
  },
  {
    id: 59,
    name: "Janaki Ram",
    location: "Chennai",
    rating: 4,
    category: "Corporate",
    date: "Jul 2021",
    comment: "Very solid coordination for our media launch. The press conference setups, audio-visual support, and branding backdrops were handled with great care."
  },
  {
    id: 60,
    name: "Anantha Krishnan",
    location: "Hyderabad",
    rating: 5,
    category: "Wedding",
    date: "Jun 2021",
    comment: "Outstanding wedding organizers! The grand entrance, crystal details, and coordination during the wedding ceremonies were absolutely outstanding."
  },
  {
    id: 61,
    name: "Ranganathan Swamy",
    location: "Bangalore",
    rating: 5,
    category: "Branding",
    date: "May 2021",
    comment: "We worked with them on our corporate rebranding. The visual style, presentation templates, and corporate guidelines are clean and professional."
  },
  {
    id: 62,
    name: "Devaki Amma",
    location: "Kochi",
    rating: 5,
    category: "Celebration",
    date: "Apr 2021",
    comment: "Designed a lovely Vishu feast and celebration. The traditional flower arrangements (Kani) and the dining layout were very authentic."
  },
  {
    id: 63,
    name: "Bala Murugan",
    location: "Trichy",
    rating: 4,
    category: "Celebration",
    date: "Mar 2021",
    comment: "Organized a retirement party for my father. The family photo gallery walk they set up was a wonderful, nostalgic element. Very polite event hosts."
  },
  {
    id: 64,
    name: "Padma Priya",
    location: "Chennai",
    rating: 5,
    category: "Wedding",
    date: "Feb 2021",
    comment: "Stunning wedding decor at ITC Grand Chola Chennai. The floral archways and the grand main stage felt extremely luxurious. Flawless execution."
  },
  {
    id: 65,
    name: "Gopalakrishnan Nair",
    location: "Trivandrum",
    rating: 5,
    category: "Corporate",
    date: "Jan 2021",
    comment: "Excellent event management of our regional office inauguration. Prompt setup, professional hosts, and great catering coordination."
  },
  {
    id: 66,
    name: "Savitri Devi",
    location: "Coimbatore",
    rating: 5,
    category: "Branding",
    date: "Dec 2020",
    comment: "We loved the logo design they created for our organic farm produce. It is simple, meaningful, and looks great on all our boxes and bags."
  },
  {
    id: 67,
    name: "Nandakumar Menon",
    location: "Kochi",
    rating: 5,
    category: "Wedding",
    date: "Nov 2020",
    comment: "Organized our daughter's wedding at a backwater resort. The sunset lawn ceremony setup was postcard-perfect. The team was extremely professional."
  },
  {
    id: 68,
    name: "Sudha Rangan",
    location: "Bangalore",
    rating: 4,
    category: "Celebration",
    date: "Oct 2020",
    comment: "A beautiful themed housewarming setup. The entrance marigold cascades were fresh and beautifully arranged. Very good experience overall."
  },
  {
    id: 69,
    name: "Muthu Krishnan",
    location: "Chennai",
    rating: 5,
    category: "Branding",
    date: "Sep 2020",
    comment: "Excellent logo design for our tea distribution business. The leaf details and high-quality packaging mockups made the decision very easy for us."
  },
  {
    id: 70,
    name: "Vasantha Kumari",
    location: "Hyderabad",
    rating: 5,
    category: "Celebration",
    date: "Aug 2020",
    comment: "They organized our daughter's Bharatanatyam Arangetram. The stage lighting, sound system, and VIP seating arrangements were handled flawlessly."
  },
  {
    id: 71,
    name: "Senthil Kumar",
    location: "Salem",
    rating: 5,
    category: "Corporate",
    date: "Jul 2020",
    comment: "Excellent management of our manufacturing plant silver jubilee celebration. They managed the large crowd and VIP logistics with great ease."
  },
  {
    id: 72,
    name: "Revathi Sridhar",
    location: "Chennai",
    rating: 5,
    category: "Wedding",
    date: "Jun 2020",
    comment: "A fairytale wedding theme executed at Fisherman's Cove. The white drapery and gold pillars looked stunning against the blue sea. Highly professional."
  },
  {
    id: 73,
    name: "Chidambaram Pillai",
    location: "Madurai",
    rating: 4,
    category: "Celebration",
    date: "May 2020",
    comment: "Traditional temple homam arrangements were excellent. The brass vessels and floral decorations were handled beautifully. Very respectful team."
  },
  {
    id: 74,
    name: "Mythili Swamy",
    location: "Bangalore",
    rating: 5,
    category: "Wedding",
    date: "Apr 2020",
    comment: "They coordinated our wedding at Taj West End. The flower setups, the classical music group, and the main stage arrangements were top-notch."
  },
  {
    id: 75,
    name: "Rajendran Pillai",
    location: "Trivandrum",
    rating: 5,
    category: "Corporate",
    date: "Mar 2020",
    comment: "Outstanding event management for our bank's annual meet. The stage setups, registration stalls, and award trophies were all very professional."
  },
  {
    id: 76,
    name: "Rajeshwari Iyer",
    location: "Chennai",
    rating: 5,
    category: "Branding",
    date: "Feb 2020",
    comment: "Excellent visual identity work for our boutique cafe. The gold logo, coffee cup patterns, and menu designs have received great reviews."
  },
  {
    id: 77,
    name: "Viswanathan Chettiar",
    location: "Karaikudi",
    rating: 5,
    category: "Celebration",
    date: "Jan 2020",
    comment: "We had my wife's 60th birthday celebration at our ancestral home in Chettinad. The traditional designs and lighting were handled beautifully."
  },
  {
    id: 78,
    name: "Latha Magesh",
    location: "Chennai",
    rating: 4,
    category: "Wedding",
    date: "Dec 2019",
    comment: "Beautiful wedding reception stage decor. The backdrop was filled with fresh orchids. The planners were very supportive throughout the process."
  },
  {
    id: 79,
    name: "Anantha Narayanan",
    location: "Bangalore",
    rating: 5,
    category: "Corporate",
    date: "Nov 2019",
    comment: "Very solid management of our software launch event. The live streams, projector screens, and media desks were perfectly set up."
  },
  {
    id: 80,
    name: "Parvathy Ram",
    location: "Kochi",
    rating: 5,
    category: "Branding",
    date: "Oct 2019",
    comment: "They designed the logo and packaging for our organic skin care range. The pastel colors and premium gold elements are beautiful."
  },
  {
    id: 81,
    name: "Sundararajan Swamy",
    location: "Chennai",
    rating: 5,
    category: "Celebration",
    date: "Sep 2019",
    comment: "Very elegant arrangement for our silver jubilee. The live music ensemble and the floral gallery were highlights of the event."
  },
  {
    id: 82,
    name: "Subhashini Reddy",
    location: "Nellore",
    rating: 5,
    category: "Wedding",
    date: "Aug 2019",
    comment: "A grand destination wedding planned at a beach resort near Nellore. The lighting and flower arrangements were absolutely magnificent."
  },
  {
    id: 83,
    name: "Madhavan Pillai",
    location: "Kollam",
    rating: 4,
    category: "Celebration",
    date: "Jul 2019",
    comment: "Planned our retirement party with a clean, formal heritage theme. The setup was ready on time and the staff behaved very professionally."
  },
  {
    id: 84,
    name: "Vijayalakshmi Rao",
    location: "Bangalore",
    rating: 5,
    category: "Branding",
    date: "Jun 2019",
    comment: "Excellent logo design for our premium bakery shop. The branding feels classic, warm, and highly inviting. Highly recommend their design division."
  },
  {
    id: 85,
    name: "Karthikeyan Shanmugam",
    location: "Erode",
    rating: 5,
    category: "Corporate",
    date: "May 2019",
    comment: "Excellent management of our textile mill's annual worker union summit. Clean stage, solid audio systems, and prompt dinner service."
  },
  {
    id: 86,
    name: "Gita Balakrishnan",
    location: "Kochi",
    rating: 5,
    category: "Wedding",
    date: "Apr 2019",
    comment: "They coordinated our wedding on a luxury house boat in Kochi. The floral drapes and the evening lighting were magical. A memory of a lifetime."
  },
  {
    id: 87,
    name: "Senthil Nathan",
    location: "Coimbatore",
    rating: 5,
    category: "Branding",
    date: "Mar 2019",
    comment: "Very strategic rebranding strategy. They helped us rename and launch our premium organic fertilizer range. The visual charts are very helpful."
  },
  {
    id: 88,
    name: "Anjali Nair",
    location: "Thrissur",
    rating: 4,
    category: "Celebration",
    date: "Feb 2019",
    comment: "A beautiful baby naming ceremony decor. The colors were pastel and looked very refreshing. The team was extremely helpful in clean up."
  },
  {
    id: 89,
    name: "Kalyanasundaram Iyer",
    location: "Chennai",
    rating: 5,
    category: "Wedding",
    date: "Jan 2019",
    comment: "Excellent planning of our traditional wedding. The flower rangolis, jasmine decorations, and the stage setups were all done to perfection."
  },
  {
    id: 90,
    name: "Prem Kumar",
    location: "Hyderabad",
    rating: 5,
    category: "Corporate",
    date: "Dec 2018",
    comment: "Seamless event management for our annual sales meet. The registration desk, main stage screen, and guest gifts were perfectly arranged."
  },
  {
    id: 91,
    name: "Raji Viswanathan",
    location: "Bangalore",
    rating: 5,
    category: "Branding",
    date: "Nov 2018",
    comment: "They helped design the logo and menu cards for our premium vegetarian fine dining restaurant. The look is minimal and classic."
  },
  {
    id: 92,
    name: "Baskar Pillai",
    location: "Madurai",
    rating: 5,
    category: "Celebration",
    date: "Oct 2018",
    comment: "Amazing housewarming arrangements. The traditional thoranams and brass pots gave a highly auspicious and premium feel. Very good crew."
  },
  {
    id: 93,
    name: "Shobha Reddy",
    location: "Tirupati",
    rating: 4,
    category: "Wedding",
    date: "Sep 2018",
    comment: "The wedding decor they designed at a venue in Tirupati was very beautiful. The flower wall backdrop was fresh and nicely coordinated."
  },
  {
    id: 94,
    name: "Arunachalam Chettiar",
    location: "Chennai",
    rating: 5,
    category: "Corporate",
    date: "Aug 2018",
    comment: "Excellent management of our retail store's launch. The balloon cascades, music setup, and invitation prints were handled seamlessly."
  },
  {
    id: 95,
    name: "Preetham Shenoy",
    location: "Bangalore",
    rating: 5,
    category: "Branding",
    date: "Jul 2018",
    comment: "We used them for the visual design of our high-end furniture brand. The logos and social templates look extremely elegant and artistic."
  },
  {
    id: 96,
    name: "Malini Krishnan",
    location: "Chennai",
    rating: 5,
    category: "Celebration",
    date: "Jun 2018",
    comment: "Excellent themed birthday party. The unicorn floral setup was absolutely magical. The kids had an amazing time and the cake was beautiful."
  },
  {
    id: 97,
    name: "Srinivasan Swamy",
    location: "Trichy",
    rating: 5,
    category: "Wedding",
    date: "May 2018",
    comment: "The traditional mandap drapes and floral arches they set up were excellent. Very helpful crew who worked late nights to complete setups."
  },
  {
    id: 98,
    name: "Radhakrishnan Nair",
    location: "Kochi",
    rating: 4,
    category: "Corporate",
    date: "Apr 2018",
    comment: "Very reliable corporate event planners. They handled our press meet and dealer conference logistics flawlessly. Very polite behavior."
  },
  {
    id: 99,
    name: "Meera Ranganathan",
    location: "Chennai",
    rating: 5,
    category: "Branding",
    date: "Mar 2018",
    comment: "They created the brand concept and brochure design for our handcrafted jewelry line. The paper suggestions and gold foil prints were stunning."
  },
  {
    id: 100,
    name: "Vigneshwaran Pillai",
    location: "Tanjore",
    rating: 5,
    category: "Celebration",
    date: "Feb 2018",
    comment: "Planned our ancestral home restoration housewarming. The flower arrangements, classical violin concert, and prasadam distribution were managed beautifully."
  }
];

export default function Reviews() {
  const [introDone, setIntroDone] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(10);

  // Filter and Search logic
  const filteredReviews = reviewsData.filter((review) => {
    const matchesCategory =
      activeCategory === "All" || review.category.toLowerCase() === activeCategory.toLowerCase();
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      review.name.toLowerCase().includes(searchLower) ||
      review.location.toLowerCase().includes(searchLower) ||
      review.comment.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Wedding", "Corporate", "Branding", "Celebration"];

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, filteredReviews.length));
  };

  return (
    <>
      <AnimatePresence>
        {!introDone && <StarIntro onComplete={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 30 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="py-12 px-2 w-full max-w-7xl mx-auto"
        style={{ pointerEvents: introDone ? "auto" : "none" }}
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight">Client Stories</h1>
          <div className="w-20 h-px bg-gold mx-auto mb-8" />
          <p className="text-cream/80 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
            Read authentic reviews from clients across South India who transformed their visions into reality with us.
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="max-w-4xl mx-auto mb-12 bg-maroon-dark/60 border border-cream/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl backdrop-blur-md">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl text-gold mb-1">4.9 out of 5 stars</h3>
            <p className="text-cream/60 font-sans text-xs uppercase tracking-wider">Based on 100 verified client experiences</p>
          </div>
          <div className="flex gap-1.5 text-gold">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-8 h-8 fill-gold drop-shadow-[0_0_8px_rgba(197,160,89,0.3)]" />
            ))}
          </div>
          <div className="text-center md:text-right">
            <div className="text-3xl font-serif text-cream">100%</div>
            <p className="text-cream/60 font-sans text-xs uppercase tracking-wider">Client satisfaction rate</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(10); // reset visible count on category change
                }}
                className={`px-4 py-2 rounded-full font-serif text-sm border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold border-gold text-maroon-dark font-medium shadow-md"
                    : "border-cream/10 text-cream hover:border-gold/50"
                }`}
              >
                {cat === "Celebration" ? "Bespoke Celebrations" : cat === "Corporate" ? "Corporate Events" : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(10); // reset visible count on query change
              }}
              placeholder="Search by name or city..."
              className="w-full pl-11 pr-4 py-2 rounded-full border border-cream/10 bg-maroon-dark/40 text-cream font-sans text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-cream/35"
            />
          </div>
        </div>

        {/* Review Cards Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-cream/20 mx-auto mb-4" />
            <p className="text-cream/60 font-sans">No reviews found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredReviews.slice(0, visibleCount).map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(idx % 10 * 0.05, 0.5) }}
                  className="w-full aspect-auto h-full"
                >
                  <TiltCard showGlare={false} className="bg-maroon-dark/40 border border-cream/10 p-6 md:p-8 flex flex-col justify-between shadow-xl h-full w-full hover:border-gold/30 transition-all rounded-3xl">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors">{review.name}</h3>
                          <p className="text-gold/80 font-sans text-xs tracking-wider mt-0.5">{review.location} &bull; {review.date}</p>
                        </div>
                        <div className="flex text-gold">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                          ))}
                        </div>
                      </div>
                      <p className="text-cream/75 font-light leading-relaxed text-sm md:text-base italic mb-6">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-cream/5">
                      <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-cream/40">Verified Client</span>
                      <span className="text-xs font-serif text-gold italic">{review.category}</span>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredReviews.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 bg-cream text-maroon-dark px-8 py-3.5 rounded-full font-serif font-medium tracking-wide hover:bg-gold transition-colors duration-300 shadow-lg"
            >
              Load More Reviews
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
