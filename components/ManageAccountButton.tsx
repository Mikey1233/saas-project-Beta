import {genratePortalLink} from "@/actions/generatePortalLink"

function ManageAccountButton() {
  return (
    <form action={genratePortalLink}>
      <button type="submit">Manage Billing</button>
    </form>
  )
}

export default ManageAccountButton
