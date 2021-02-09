import {
  faLanguage,
  faNewspaper,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export const routes = [
  { title: "blog", url: "/blog", route: "blog", icon: faNewspaper },
  // { title: "arabic", url: "/arabic", route: "arabic", icon: faLanguage },
  { title: "about", url: "/about", route: "about", icon: faUser }
];

export const blogRoutes = [
  { title: "all posts", url: "/blog", route: "blog" },
  { title: "thoughts", url: "/blog", route: "thoughts" },
  { title: "programming", url: "/blog", route: "programming" },
  { title: "school", url: "/blog", route: "school" },
  { title: "work", url: "/blog", route: "work" }
];
