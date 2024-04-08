import { categories } from '@lib/constants/categories';
import React from 'react';
import Link from 'next/link';
import { clientRoutes } from '@lib/routes';

const CategoryList = ({ toggleSidebar }) => {
  return (
      <ul className="flex flex-col gap-4 w-full">
        {categories.map((category) => (
          <li key={category.category_id} className="flex flex-col bg-zinc-900 p-4 shadow rounded-md w-full">
            <Link href={`${clientRoutes.categories}/${category.category_id}`} onClick={toggleSidebar} className="text-lg font-semibold mb-2 text-gray-200 cursor-pointer hover:text-gray-400 w-full">
              {category.name}
            </Link>
            {category.subCategories && (
              <ul className="flex flex-col gap-1 mt-2">
                {category.subCategories.map((subCategory) => (
                  <li className='flex w-full' key={subCategory.subCategory_id}>
                    <Link onClick={toggleSidebar} href={`${clientRoutes.categories}/${subCategory.subCategory_id}`} className="text-lg w-full text-gray-300 px-2 py-2 rounded-lg hover:bg-black">
                      {subCategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
  );
};

export default CategoryList;
