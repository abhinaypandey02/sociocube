import type { ReactNode } from "react";
import React from "react";

interface MarkdownProps {
  children?: ReactNode;
}

export const MARKDOWN_COMPONENTS = {
  h1: (props: MarkdownProps) => (
    <h2 className="mb-10 font-poppins text-3xl font-semibold sm:text-5xl ">
      {props.children}
    </h2>
  ),
  h2: (props: MarkdownProps) => (
    <h3 className="my-5 font-poppins text-2xl font-semibold sm:text-4xl">
      {props.children}
    </h3>
  ),
  h3: (props: MarkdownProps) => (
    <h4 className="my-5 font-poppins text-xl font-semibold sm:text-2xl">
      {props.children}
    </h4>
  ),
  h4: (props: MarkdownProps) => (
    <h5 className="my-5 font-poppins text-lg font-semibold sm:text-xl">
      {props.children}
    </h5>
  ),
  h5: (props: MarkdownProps) => (
    <h6 className="my-5 font-poppins  font-semibold sm:text-lg">
      {props.children}
    </h6>
  ),
  h6: (props: MarkdownProps) => (
    <h6 className="my-5 font-poppins font-semibold sm:text-lg">
      {props.children}
    </h6>
  ),
  ol: (props: MarkdownProps) => (
    <ol className="list-decimal">{props.children}</ol>
  ),
  ul: (props: MarkdownProps) => <ul className="list-disc">{props.children}</ul>,
  hr: () => <hr className="my-9 border-gray-200" />,
  li: (props: MarkdownProps) => (
    <li className="my-2 translate-x-5">{props.children}</li>
  ),
  p: (props: MarkdownProps) => (
    <p className="my-4 text-justify">{props.children}</p>
  ),
  strong: (props: MarkdownProps) => (
    <strong className="font-medium">{props.children}</strong>
  ),
  a: (props: MarkdownProps) => (
    <a {...props} className="font-medium text-accent">
      {props.children}
    </a>
  ),
  td: (props: MarkdownProps) => (
    <td
      {...props}
      className={
        "px-4 border-l nth-1:border-l-0 py-2 mx-2 align-middle whitespace-nowrap "
      }
    >
      {props.children}
    </td>
  ),
  th: (props: MarkdownProps) => (
    <th
      {...props}
      className={"border-b nth-1:border-l-0 border-l py-2 mx-2 px-4"}
    >
      {props.children}
    </th>
  ),
};
