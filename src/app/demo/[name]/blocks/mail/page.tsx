import Image from "next/image"

import { Mail } from "./components/mail"
import {
  accounts,
  mails,
} from "./components/data"

export default async function MailPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden h-screen flex-col md:flex">
        <Mail
          accounts={accounts.map((account) => ({
            ...account,
          }))}
          mails={mails}
          defaultLayout={[20, 32, 48]}
          defaultCollapsed={false}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
