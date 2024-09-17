import CreateHospitalAdminAccountForm from "@/components/forms/CreateHospitalAdminAccountForm";
import Footer from "@/components/widgets/Footer";
import NavBar from "@/components/widgets/NavBar";

export default function CreateAccountForHospital() {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <CreateHospitalAdminAccountForm />
      </div>
      <Footer />
    </div>
  )
}
