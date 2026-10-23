import ChangePasswordView from "@/app/(screens)/components/reusable/profile/ChangePasswordView";

export const metadata = {
  title: "Change Password | SuperAdmin | GK-Gym Life",
  description: "Update your SuperAdmin account password securely.",
};

export default function SuperAdminChangePasswordPage() {
  return <ChangePasswordView backHref="/superadmin/profile" portalTitle="Super Admin" />;
}
