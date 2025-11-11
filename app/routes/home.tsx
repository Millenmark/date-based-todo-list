import type { Route } from "./+types/home";
import { TodoApp } from "../components/TodoApp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo App" },
    { name: "description", content: "A simple and clean todo application" },
  ];
}

export default function Home() {
  return <TodoApp />;
}
