"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface MealInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  meal?: any;
}

export default function MealInfoModal({ isOpen, onOpenChange, meal }: MealInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Détails du repas</ModalHeader>
        <ModalBody>
          {/* Détails du repas */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onOpenChange(false)}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 