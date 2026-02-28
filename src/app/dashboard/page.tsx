import Link from "next/link";

const Admin = () => {
  const menuItems = [
    { name: "Jobs", href: "/dashboard/jobs", count: "156" },
    { name: "Categories", href: "/dashboard/categories", count: "12" },
    { name: "Locations", href: "/dashboard/locations", count: "8" },
    { name: "Applications", href: "/dashboard/applications", count: "1,432" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Quick Hire Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Manage your platform settings</p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h2>
                <span className="text-sm text-gray-500">{item.count}</span>
              </div>
              <p className="text-sm text-gray-500">
                Manage {item.name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              + Add New Job
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              + Add New Category
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              + Add New Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
