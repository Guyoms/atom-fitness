"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface SupplementInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  supplement?: any;
}

export default function SupplementInfoModal({ isOpen, onOpenChange, supplement }: SupplementInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Information Complément</ModalHeader>
        <ModalBody>
          {/* Infos sur le complément */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onOpenChange(false)}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 