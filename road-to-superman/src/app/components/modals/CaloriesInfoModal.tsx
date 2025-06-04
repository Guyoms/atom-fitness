"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface CaloriesInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CaloriesInfoModal({ isOpen, onOpenChange }: CaloriesInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Stratégie Calorique</ModalHeader>
        <ModalBody>
          {/* Stratégie calorique */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onOpenChange(false)}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 