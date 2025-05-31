"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useTransactionPopup } from "@blockscout/app-sdk"
import { baseWithBlockscout } from "@/lib/blockscout"
import { useAccount } from "wagmi"

export function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-xl font-bold">
            Panda Trade
          </h1>
        </Link>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <TransactionHistoryItems />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <ConnectButton />
    </div>
  )
}

function TransactionHistoryItems() {
  const { openPopup } = useTransactionPopup();
  const { address } = useAccount();

  const showAddressTransactions = () => {
    openPopup({
      chainId: baseWithBlockscout.id.toString(),
      address,
    });
  };

  const showAllTransactions = () => {
    openPopup({
      chainId: baseWithBlockscout.id.toString(),
    });
  };

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <button onClick={showAddressTransactions}>
            Transaction History
          </button>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <button onClick={showAllTransactions}>
            View All Transactions
          </button>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  )
}

