import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

type SelectProps = {
  placeholder?: string;
  options: string[];
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
};

export const Select = ({ placeholder, options, value, onChange, className }: SelectProps) => {
  return (
    <Menu as="div" className={classNames("relative inline-block text-left", className)}>
      <div>
        <Menu.Button
          className={classNames(
            "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
            value && "font-semibold text-gray-600",
          )}
        >
          {value || placeholder}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map(option => (
              <Menu.Item key={option}>
                {({ active }: { active: boolean }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm",
                    )}
                    onClick={() => {
                      if (option !== value) {
                        onChange(option);
                      }
                    }}
                  >
                    {option}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
