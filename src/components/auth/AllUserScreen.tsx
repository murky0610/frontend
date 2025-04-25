"use client"
//import { getAllUsers, editCurrentUser } from "@/api/api"
import { getAllUsers } from "@/api/api"
import { UserAccountsInterface } from "@/interface/user-accounts.interface"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"

export function AllUserScreen() {
  const [allUsers, setAllUsers] = useState<UserAccountsInterface[] | null>(null)
  const [isEditingRoles, setIsEditingRoles] = useState(false)
  const [pendingChanges, setPendingChanges] = useState<Record<number, string>>({})

  useEffect(() => {
    const fetchAllUserData = async () => {
      try {
        const response = await getAllUsers()
        setAllUsers(response)
      } catch (error) {
        console.error("Failed to fetch user details:", error)
      }
    }
    fetchAllUserData()
  }, [])

  const handleRoleChange = (userId: number, newRole: string) => {
    setPendingChanges(prev => ({
      ...prev,
      [userId]: newRole,
    }))
  }

  const handleSaveRoles = async () => {
    if (!allUsers) return

    try {
      // Update local state
      const updatedUsers = allUsers.map(user => ({
        ...user,
        role: pendingChanges[user.id] || user.role
      }))
      
      // Update backend
      // await Promise.all(
      //   Object.entries(pendingChanges).map(([userId, newRole]) => 
      //     editCurrentUser(parseInt(userId), { role: newRole })
      //   )
      // )

      setAllUsers(updatedUsers)
      setPendingChanges({})
      setIsEditingRoles(false)
    } catch (error) {
      console.error("Failed to save roles:", error)
    }
  }

  return (
    <div className="p-4">
      <Button onClick={() => isEditingRoles ? handleSaveRoles() : setIsEditingRoles(true)}>
        {isEditingRoles ? "Save Roles" : "Edit Roles"}
      </Button>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {allUsers ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center"> {`${user.first_name} ${user.last_name}`}</td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {isEditingRoles ? (
                    <select
                      value={pendingChanges[user.id] || user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value={user.role} disabled>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </option>
                      {['admin', 'user', 'researcher']
                        .filter(role => role !== user.role)
                        .map(role => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ))}
                    </select>
                  ) : (
                    user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  )}
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  )
}