import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer class=" bg-gray-100 z-50 ">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <Link to="/job-applications" class="hover:underline">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/internship-details" class="hover:underline">
                      Internship
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a
                      href="https://github.com/themesberg/flowbite"
                      class="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <Link to="/refund-policy" class="hover:underline">
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <Link to="/privacy-policy" class="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions" class="hover:underline">
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex  sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025{" "}
              <a href="/" class="hover:underline">
                Synexoo
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
