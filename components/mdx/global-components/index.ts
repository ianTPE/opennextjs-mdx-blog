"use client";

import Alert from "./Alert";
import {
  Alert as UIAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogueBlock from "../DialogueBlock";
import CustomCodeBlock from "../CustomCodeBlock";

export const globalComponents = {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DialogueBlock,
  UIAlert,
  // Override default code component
  code: CustomCodeBlock,
};
